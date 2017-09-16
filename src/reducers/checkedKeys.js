import { UPDATE_CHECKED_KEYS } from 'actions/actionTypes';
import * as _ from 'lodash';

export default function checkedKeys(state = [], action) {
  const { type: actionType, payload } = action;
  switch(actionType) {
    case UPDATE_CHECKED_KEYS:
      const oldCheckedKeys = state;
      const newCheckedKeys = payload;
      const diff = [];

      // 如果新增了勾选
      if (newCheckedKeys.length > oldCheckedKeys.length) {
        newCheckedKeys.forEach((newEachKey) => {
          // 找到新增的勾选是哪一个
          // 没有在旧的keys中出现的即是新增的
          if (oldCheckedKeys.indexOf(newEachKey) < 0) {
            diff.push(newEachKey);
          }
          console.log('New Added Keys--->', diff);
        })
      // 如果取消勾选
      } else if (newCheckedKeys.length < oldCheckedKeys.length) {

          oldCheckedKeys.forEach((oldEachKey) => {
            // 找到取消的勾选是哪一个
            // 没有在新的keys中出现的即是新增的
            if (newCheckedKeys.indexOf(oldEachKey) < 0) {
              diff.push(oldEachKey);
            }
            console.log('Removed Added Keys--->', diff);
          })
      }

      return payload;
    default: return state;
  }
}