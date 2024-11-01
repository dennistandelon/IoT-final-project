interface PumpControlProps {
    isPumpOn: boolean;
    loading: boolean;
    onControlPump: (state: 'on' | 'off') => void;
}