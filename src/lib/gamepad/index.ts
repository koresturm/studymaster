interface GamepadControllerOptions {
  deadzone?: number;
}

interface GamepadEvent {
  gamepad: Gamepad;
}

interface ButtonPressEvent extends GamepadEvent {
  button_index: number;
  pressed: boolean;
}

interface AxisMoveEvent extends GamepadEvent {
  axis_index: number;
  value: number;
}

type EventType = 'connect' | 'disconnect' | 'buttonpress' | 'axismove';
type EventCallback<T> = (event: T) => void;

class GamepadController {
  private gamepads: Map<number, Gamepad> = new Map();
  private listeners: Record<EventType, Function[]> = {
    connect: [],
    disconnect: [],
    buttonpress: [],
    axismove: []
  };
  private deadzone: number;

  constructor(options: GamepadControllerOptions = {}) {
    this.deadzone = options.deadzone || 0;
    this._init();
  }

  private _init(): void {
    window.addEventListener('gamepadconnected', this._onGamepadConnected.bind(this));
    window.addEventListener('gamepaddisconnected', this._onGamepadDisconnected.bind(this));
  }

  private _onGamepadConnected(event: GamepadEvent): void {
    const gamepad = event.gamepad;
    this.gamepads.set(gamepad.index, gamepad);
    this._notifyListeners('connect', gamepad);
  }

  private _onGamepadDisconnected(event: GamepadEvent): void {
    const gamepad = event.gamepad;
    this.gamepads.delete(gamepad.index);
    this._notifyListeners('disconnect', gamepad);
  }

  update(): void {
    const gamepads = navigator.getGamepads();
    for (const gamepad of gamepads) {
      if (!gamepad) continue;

      const prevGamepad = this.gamepads.get(gamepad.index);
      if (!prevGamepad) continue;

      this._checkButtonChanges(gamepad, prevGamepad);
      this._checkAxisChanges(gamepad, prevGamepad);

      this.gamepads.set(gamepad.index, gamepad);
    }
  }

  private _checkButtonChanges(currentGamepad: Gamepad, prevGamepad: Gamepad): void {
    currentGamepad.buttons.forEach((button, index) => {
      const prevButton = prevGamepad.buttons[index];
      if (button.pressed !== prevButton.pressed) {
        this._notifyListeners('buttonpress', {
          gamepad: currentGamepad,
          button_index: index,
          pressed: button.pressed
        });
      }
    });
  }

  private _checkAxisChanges(currentGamepad: Gamepad, prevGamepad: Gamepad): void {
    currentGamepad.axes.forEach((axisValue, index) => {
      const prevAxisValue = prevGamepad.axes[index];
      if (Math.abs(axisValue - prevAxisValue) > this.deadzone) {
        this._notifyListeners('axismove', {
          gamepad: currentGamepad,
          axis_index: index,
          value: axisValue
        });
      }
    });
  }

  on<T extends EventType>(
    eventType: T, 
    callback: EventCallback<T extends 'connect' | 'disconnect' ? GamepadEvent : T extends 'buttonpress' ? ButtonPressEvent : AxisMoveEvent>
  ): (() => void) {
    if (this.listeners[eventType]) {
      this.listeners[eventType].push(callback);
      
      // Return an unsubscribe function
      return () => {
        const index = this.listeners[eventType].indexOf(callback);
        if (index !== -1) {
          this.listeners[eventType].splice(index, 1);
        }
      };
    }
    
    // Return no-op if event type is invalid
    return () => {};
  }

  private _notifyListeners(eventType: EventType, data: any): void {
    this.listeners[eventType].forEach(callback => callback(data));
  }

  getGamepad(index: number): Gamepad | undefined {
    return this.gamepads.get(index);
  }

  getAllGamepads(): Gamepad[] {
    return Array.from(this.gamepads.values());
  }

  // Cleanup method to remove all event listeners
  destroy(): void {
    window.removeEventListener('gamepadconnected', this._onGamepadConnected.bind(this));
    window.removeEventListener('gamepaddisconnected', this._onGamepadDisconnected.bind(this));
    
    // Clear all listeners
    Object.keys(this.listeners).forEach(key => {
      this.listeners[key as EventType] = [];
    });
    
    this.gamepads.clear();
  }
}

export default GamepadController;