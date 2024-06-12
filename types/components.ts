export interface BaseDialog {
  show: () => void;
  close: (returnVal?: string) => void;
  visible: boolean;
}
