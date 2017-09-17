import { UPDATE_CHECKED_KEYS } from 'actions/actionTypes';
import appFolderStructure from 'common/project-structure';
import FILE_TYPES from 'common/file-types';
import * as _ from 'lodash';

export default function checkedKeys(state = [], action) {
  const { type: actionType, payload } = action;
  switch(actionType) {
    case UPDATE_CHECKED_KEYS:
      const oldCheckedKeys = state;
      const newCheckedKeys = payload;
      const diff = [];

      // 根据keyPairs找到那个节点
      const findNodeByKeyPairs = (root, keyPairs) => {
        const findNodeInChildren = (root, keyPairs) => {
          const { children } = root;
          
          const [firstKeyPair] = keyPairs;
          const [pairName, pairType] = firstKeyPair.split(':');

          for (let i = 0; i < children.length; i++) {
            const tempChild = children[i];
            const { name, type = FILE_TYPES.FILE } = tempChild;
            if (name === pairName && pairType === type) {
              if (keyPairs.length > 1) {
                return findNodeInChildren(tempChild, keyPairs.slice(1));
              } else {
                return tempChild;
              }
            }
          }
        }

        // 如果只有一对key
        // 那么直接返回根元素
        if (keyPairs.length === 1 || !keyPairs.length) {
          return root;
        }

        // 否则去它的孩子元素中查找
        return findNodeInChildren(root, keyPairs.slice(1));
      }

      // 选中/反选 某个节点的所有子元素
      const checkChildren = (node, parentKeys = [], checked = true) => {
        const { children, type = FILE_TYPES.FILE, name } = node;
        const currentKeys = parentKeys.length ? [...parentKeys, `${name}:${type}`] : [`${name}:${type}`];
        const currentKeyStr = currentKeys.join('-');

        if (checked) {
          if (newCheckedKeys.indexOf(currentKeyStr) < 0) {
            newCheckedKeys.push(currentKeyStr);
          }
        } else {
          const checkedKeysIndex = newCheckedKeys.indexOf(currentKeyStr);
          if (checkedKeysIndex > -1) {
            newCheckedKeys.splice(checkedKeysIndex, 1);
          }
        }

        if (type === FILE_TYPES.FOLDER && children && children.length) {
          children.forEach((child) => {
            checkChildren(child, currentKeys, checked);
          })
        }
      }

      // 如果新增了勾选
      if (newCheckedKeys.length > oldCheckedKeys.length) {
        newCheckedKeys.forEach((newEachKey) => {
          // 找到新增的勾选是哪一个
          // 没有在旧的keys中出现的即是新增的
          if (oldCheckedKeys.indexOf(newEachKey) < 0) {
            diff.push(newEachKey);
          }
          diff.forEach((eachDiff) => {
            // 如果新增勾选的父元素没有勾选，则自动将其进行勾选
            const keyPairs = eachDiff.split('-')
            let keyPairsLength = keyPairs.length;
            while (keyPairsLength) {
              const parentKeyPairs = keyPairs.slice(0, keyPairsLength - 1);
              const parentKeyStr = parentKeyPairs.join('-');
              if (newCheckedKeys.indexOf(parentKeyStr) < 0) {
                newCheckedKeys.push(parentKeyStr);
              }
              keyPairsLength--;
            }
            // 如果勾选的元素是文件夹，
            // 并且有子元素，则将子元素进行默认勾选
            const addedNode = findNodeByKeyPairs(appFolderStructure, keyPairs);
            const eachDiffPair = eachDiff.split('-');
            checkChildren(addedNode, eachDiffPair.slice(0, eachDiffPair.length - 1));
          });
        })
      // 如果取消勾选
      } else if (newCheckedKeys.length < oldCheckedKeys.length) {

          oldCheckedKeys.forEach((oldEachKey) => {
            // 找到取消的勾选是哪一个
            // 没有在新的keys中出现的即是新增的
            if (newCheckedKeys.indexOf(oldEachKey) < 0) {
              diff.push(oldEachKey);
            }
          });

          diff.forEach((eachDiff) => {
            const keyPairs = eachDiff.split('-')  
            // 找到子元素的父元素，
            // 如果父元素的所有子元素都取消选择了
            // 则父元素也被取消勾选

            // 注意如果当前新增元素已经是根元素
            // 那么parentKeyPairs则是为空
            const parentKeyPairs = keyPairs.slice(0, keyPairs.length - 1);
            const parentKeyStr = parentKeyPairs.join('-');
            const parentNode = findNodeByKeyPairs(appFolderStructure, parentKeyPairs);
            const { children } = parentNode;
            // 假设需要需要父元素被uncheck
            let uncheckParent = true; 
            children.forEach((child) => {
              const { name, type = FILE_TYPES.FILE } = child;
              const childKeyPairs = [...parentKeyPairs, `${name}:${type}`];
              const childKeyStr = childKeyPairs.join('-');
              // 如果有任何一个子元素被勾选
              // 则父元素不必被取消
              if (newCheckedKeys.indexOf(childKeyStr) > -1) {
                uncheckParent = false;
              }
            });
            // 如果父元素确实需要被取消勾选
            // 则从newCheckedKeys中移除
            if (uncheckParent && newCheckedKeys.indexOf(parentKeyStr) > -1) {
              newCheckedKeys.splice(newCheckedKeys.indexOf(parentKeyStr), 1);
            }

            // 如果取消勾选的元素是文件夹，
            // 并且有子元素，则将所有子元素取消勾选
            const removedNode = findNodeByKeyPairs(appFolderStructure, keyPairs);
            const eachDiffPair = eachDiff.split('-');
            checkChildren(removedNode, eachDiffPair.slice(0, eachDiffPair.length - 1), false);            
          })
      }

      return newCheckedKeys;
    default: return state;
  }
}