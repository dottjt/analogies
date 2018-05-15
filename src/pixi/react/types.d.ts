import { ReduxActions } from '../helpers/types';

declare module IChecklist {
  export interface ChecklistItem {
    id: string,
    label: string,
    annotation?: string,    
    selected: boolean,
    disabled: boolean,
  }
}
