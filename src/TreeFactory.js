import NodeFactory from './NodeFactory.js';

function BSTFactory(data = []) {
  let root = null;

  function arrayToTree(dataArray, first, last) {
    if (first > last) return null;
    const mid = Math.floor((first + last) / 2);
    const rootNode = NodeFactory(dataArray[mid]);
    rootNode.leftChild = arrayToTree(dataArray, first, mid - 1);
    rootNode.rightChild = arrayToTree(dataArray, mid + 1, last);

    return rootNode;
  }

  function buildTree(dataArray) {
    const lastIndex = dataArray.length - 1;
    const rootNode = arrayToTree(dataArray, 0, lastIndex);
    root = rootNode;
    return root;
  }

  function addEntry(rootNode, value) {
    const rootValue = rootNode.value;
    if (value < rootValue) {
      if (rootNode.leftChild !== null) addEntry(rootNode.leftChild, value);
      else rootNode.leftChild = NodeFactory(value);
    }
    if (value > rootValue) {
      if (rootNode.rightChild !== null) {
        addEntry(rootNode.rightChild, value);
      } else {
        rootNode.rightChild = NodeFactory(value);
      }
    }
  }

  function insert(value) {
    if (root === null) root = NodeFactory(value);
    else addEntry(root, value);
  }

  function removeFromRoot(rootNode) {
    let returnNode = rootNode;
    if (rootNode.leftChild === null) returnNode = rootNode.rightChild;
    else if (rootNode.rightChild === null) returnNode = rootNode.leftChild;
    else {
      let succParent = rootNode;
      let succ = rootNode.rightChild;
      while (succ.leftChild !== null) {
        succParent = succ;
        succ = succ.leftChild;
      }
      if (succParent !== rootNode) succParent.leftChild = succ.rightChild;
      else succParent.rightChild = succ.rightChild;
      returnNode.value = succ.value;
    }
    return returnNode;
  }

  function removeEntry(rootNode, value) {
    if (rootNode !== null) {
      const rootValue = rootNode.value;
      if (value < rootValue) {
        rootNode.leftChild = removeEntry(rootNode.leftChild, value);
      } else if (value > rootValue) {
        rootNode.rightChild = removeEntry(rootNode.rightChild, value);
      } else {
        rootNode = removeFromRoot(rootNode);
      }
      return rootNode;
    }

    return rootNode;
  }

  function deleteItem(value) {
    if (root !== null) root = removeEntry(root, value);
  }

  function findEntry(rootNode, value) {
    if (rootNode !== null) {
      const rootValue = rootNode.value;
      if (value < rootValue) return findEntry(rootNode.leftChild, value);
      if (value > rootValue) return findEntry(rootNode.rightChild, value);
    }
    return rootNode;
  }

  function findValue(value) {
    return findEntry(root, value);
  }

  function levelOrderTraversal(cb) {}

  function getRoot() {
    return root;
  }

  buildTree(data);
  return { buildTree, insert, deleteItem, findValue, getRoot };
}

export default BSTFactory;
