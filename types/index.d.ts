import {
  AllowedComponentProps,
  ComponentCustomProps,
  VNodeProps
} from 'vue'

export declare interface VueNeatModalProps {
  alignY: 'top' | 'center' | 'bottom';
  alignX: 'left' | 'center' | 'right';
  noSpacing: boolean;
  clickOut?: boolean;
  eager?: boolean;
  teleportTarget?: string;
  backdropTransition?: string | undefined;
  modalTransition?: string | undefined;
  disableMotion?: boolean;
  removeBackdrop?: boolean;
  width?: string;
  maxWidth?: string;
  fullscreen?: boolean;
  wrapperClass?: string;
  modalClass?: string;
  backdropClass?: string;
  [key: string]: any;
}

export declare interface VueNeatModalListenerProps {
  onAfterEnter(): void;
  onAfterLeave(): void;
}

export declare function setDefaultProps(props: VueNeatModalProps): void;

export declare const Modal: new () => {
  $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & VueNeatModalProps & VueNeatModalListenerProps;
}
