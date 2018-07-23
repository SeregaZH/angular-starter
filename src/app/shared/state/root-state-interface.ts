import { LayoutStateInterface } from './layout/layout-state-interface';
import { UiStateInterface } from './ui/ui-state-interface';

export interface RootStateInterface {
    layout?: LayoutStateInterface;
    ui?: UiStateInterface;
}
