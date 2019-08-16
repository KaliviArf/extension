import { Contributor } from 'app/lmem/contributor';
import { SUBSCRIBE, UNSUBSCRIBE } from 'app/constants/ActionTypes';
import { ActionMeta, BaseAction } from '.';

export interface SubscribeAction extends BaseAction {
  type: typeof SUBSCRIBE;
  payload: { contributor: Contributor };
}
export const subscribe = (
  contributor: Contributor,
  meta?: ActionMeta
): SubscribeAction => ({
  type: SUBSCRIBE,
  payload: { contributor },
  meta
});

export interface UnsubscribeAction extends BaseAction {
  type: typeof UNSUBSCRIBE;
  payload: { contributor: Contributor };
}
export const unsubscribe = (
  contributor: Contributor,
  meta?: ActionMeta
): UnsubscribeAction => ({
  type: UNSUBSCRIBE,
  payload: { contributor },
  meta
});