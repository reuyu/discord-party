// server/src/games/ShortTrpgEngine.ts
import { BaseEngine, GameAction } from './BaseEngine';
import { Room } from '../../../shared/types';
import { Server } from 'socket.io';
import { REAL_DEFAULT_PACKS } from '../../../shared/defaultPacks';

export class ShortTrpgEngine extends BaseEngine {
  onStart(room: Room, customPackData?: any): any {
    const defaultData = REAL_DEFAULT_PACKS['short-trpg']?.[0]?.data || {
      title: '심야 고립 산장의 괴생명체',
      intro: '거센 눈보라로 통신과 전기가 모두 끊긴 깊은 산속의 고립된 산장. 밖에서 기괴한 괴생명체의 울음소리와 함께 문을 긁는 소리가 들려온다...',
      secretMissions: [
        '당신은 사실 괴생명체의 숭배자입니다. 다른 생존자들이 산장 문을 열거나 탈출하지 못하도록 자연스럽게 유도하세요.',
        '당신은 가방 안에 권총 1자루를 숨기고 있습니다. 누군가 당신을 강하게 의심하면 위협하거나 자백을 유도하세요.',
        '당신은 과거 이 산장의 주인이었습니다. 지하 지하실에 숨겨진 비상 탈출구가 있다는 것을 오직 당신만 알고 있습니다.',
        '당신은 극심한 공포증에 시달리고 있습니다. 불이 꺼지거나 큰 소리가 나면 패닉 상태로 비명을 지르며 연기하세요.',
        '당신은 사실 모든 사태를 취재하러 온 특종 기자입니다. 다른 생존자들의 비밀을 캐내려고 질문을 던지세요.'
      ]
    };
    const script = customPackData || defaultData;

    room.gameState = {
      phase: 'roleSelection', // roleSelection -> gmAnnounced -> characterCreation -> adventure -> gameEnd
      gmVolunteers: [] as string[],
      gmId: null as string | null,
      characters: {} as Record<string, {
        name: string;
        job: string;
        skill: string;
        item: string;
        concept: string;
        secretMission: string;
        stats: { str: number; dex: number; int: number; cha: number }
      }>,
      script,
      currentSceneIndex: 0,
      diceLogs: [] as { roller: string; stat: string; targetDc: number; roll: number; isSuccess: boolean; text: string }[]
    };

    return room.gameState;
  }

  handleAction(room: Room, playerId: string, action: GameAction, io: Server): void {
    const state = room.gameState;
    if (!state) return;

    // 1. GM 자원
    if (action.type === 'volunteer_gm' && state.phase === 'roleSelection') {
      const isVolunteer = !!action.payload.isVolunteer;
      if (isVolunteer) {
        if (!state.gmVolunteers.includes(playerId)) state.gmVolunteers.push(playerId);
      } else {
        state.gmVolunteers = state.gmVolunteers.filter((id: string) => id !== playerId);
      }
      this.broadcastState(room, io);
      return;
    }

    // 2. GM 확정 & 캐릭터 생성 시작
    if (action.type === 'confirm_roles' && state.phase === 'roleSelection') {
      if (state.gmVolunteers.length > 0) {
        state.gmId = state.gmVolunteers[Math.floor(Math.random() * state.gmVolunteers.length)];
      } else {
        state.gmId = room.hostId;
      }

      state.phase = 'characterCreation';
      this.broadcastState(room, io);
      return;
    }

    // 3. 캐릭터 스탯 및 직업/스킬 제출 (스탯 총합 검증)
    if (action.type === 'submit_character' && state.phase === 'characterCreation') {
      const { name, job, skill, item, concept, stats } = action.payload;
      const safeStats = stats || { str: 3, dex: 3, int: 3, cha: 3 };
      const totalPoints = (safeStats.str || 0) + (safeStats.dex || 0) + (safeStats.int || 0) + (safeStats.cha || 0);

      // 최대 16포인트 (기본 12 + 보너스 4) 제한
      if (totalPoints > 20) {
        return; // 치트 방지
      }

      const playersExceptGm = room.players.filter(p => p.id !== state.gmId);
      const playerIdx = playersExceptGm.findIndex(p => p.id === playerId);
      const missions = state.script.secretMissions || [];
      const secretMission = missions[playerIdx % Math.max(1, missions.length)] || '생존자들과 협력하여 살아서 탈출하세요!';

      state.characters[playerId] = {
        name: name || '모험가',
        job: job || '전사',
        skill: skill || '강타',
        item: item || '기본 배낭',
        concept: concept || '용감한 생존자',
        secretMission,
        stats: safeStats
      };

      const allDone = playersExceptGm.every(p => !!state.characters[p.id]);
      if (allDone) {
        state.phase = 'adventure';
      }

      this.broadcastState(room, io);
      return;
    }

    // 4. GM 전용 주사위 굴림 판정 (DC 난이도 반영)
    if (action.type === 'roll_dice_check' && playerId === state.gmId && state.phase === 'adventure') {
      const { targetPlayerId, statType, targetDc, difficultyName } = action.payload;
      const char = state.characters[targetPlayerId];
      const statVal = char?.stats?.[statType as 'str' | 'dex' | 'int' | 'cha'] || 0;

      const d20 = Math.floor(Math.random() * 20) + 1;
      const bonus = Math.floor(statVal / 2);
      const total = d20 + bonus;
      const isSuccess = total >= targetDc;

      const targetPlayer = room.players.find(p => p.id === targetPlayerId);
      const logText = `🎲 [${targetPlayer?.name} (${char?.name})] ${statType.toUpperCase()} 판정 (${difficultyName || ''} DC ${targetDc}): 주사위 ${d20} + 스탯 보정 ${bonus} = 총합 ${total} ➔ [${isSuccess ? '성공! 🎉' : '실패! 💥'}]`;

      state.diceLogs.unshift({
        roller: 'GM',
        stat: statType,
        targetDc,
        roll: total,
        isSuccess,
        text: logText
      });

      this.broadcastState(room, io);
      return;
    }

    // 5. 게임 종료
    if (action.type === 'finish_game' && playerId === state.gmId) {
      state.phase = 'gameEnd';
      this.endGame(room, { completed: true }, io);
    }
  }

  onPlayerLeave(room: Room, playerId: string, io: Server): void {
    this.broadcastState(room, io);
  }
}
