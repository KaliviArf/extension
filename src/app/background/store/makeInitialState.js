import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';
import fromJS from '../../utils/customFromJS';

/**
 * When the redux store starts empty on first use (no store in local/chrome storage)
 * this function creates the initial state
 * Among other things, this is also intended to document the state structure
 */
export default function (){
  return fromJS({
    prefs: {
      websites: new ImmutableMap(),
      criteria: new ImmutableMap(),
      editors: new ImmutableMap(),
      dismissedNotices: new ImmutableSet(),
      likedNotices: new ImmutableSet(),
      dislikedNotices: new ImmutableSet(),
      reportedNotices: new ImmutableSet(),
      onInstalledDetails: new ImmutableMap()
    },
    resources: {
      matchingContexts: new ImmutableSet(),
      draftRecommendations: new ImmutableSet()
    }
  });
}
