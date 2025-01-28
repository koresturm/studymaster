
type EventType = 'right' | 'left' | 'up' | 'down' | 'a' | 'b' | 'x' | 'y' | 'start' | 'select' | 'home';

export default class KeyboardController {

    constructor() {
        this._init();
    }

    private _init(): void {
        window.addEventListener('keydown', this._onKeyDown.bind(this));
    }

    private _onKeyDown(event: KeyboardEvent): void {

        if(event.key.toLowerCase() == 'enter') {
            this._notifyListeners('select', event)
            return
        }

        this._notifyListeners(event.key.replace('Arrow', '').toLowerCase() as EventType, event);
    }

    private _notifyListeners(eventType: EventType, data: any): void {
        if(!this.listeners[eventType]) return;
        this.listeners[eventType].forEach(callback => callback(data));
    }

    private listeners: Record<EventType, Function[]> = {
        right: [],
        left: [],
        up: [],
        down: [],
        a: [],
        b: [],
        x: [],
        y: [],
        start: [],
        select: [],
        home: []
    };

    on<T extends EventType>(
        eventType: T, 
        callback: () => void,
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
}