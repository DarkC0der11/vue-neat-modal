import {
  AllowedComponentProps,
  ComponentCustomProps,
  VNodeProps
} from 'vue'

export declare interface VueNeatModalProps {
  clickOut?: boolean;
  eager?: boolean;
  teleportTarget?: string;
  backdropTransition?: string | undefined;
  contentTransition?: string | undefined;
  disableMotion?: boolean;
  removeBackdrop?: boolean;
  width?: string;
  maxWidth?: string;
  fullscreen?: boolean;
  [key: string]: any;
}

export declare interface VueNeatModalPluginOptions {
  defaultProps: VueNeatModalProps;
}

export declare const Modal: new () => {
  $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & VueNeatModalProps;
}
