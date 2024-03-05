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
      if (rootNode.rightChild !== null) addEntry(rootNode.rightChild, value);
      else rootNode.rightChild = NodeFactory(value);
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

  function levelOrder(cb = null) {
    const nodeArrayQueue = [root];
    const returnArray = [];
    while (nodeArrayQueue.length > 0) {
      const tempNode = nodeArrayQueue.shift();
      if (tempNode.leftChild !== null) nodeArrayQueue.push(tempNode.leftChild);
      if (tempNode.rightChild !== null)
        nodeArrayQueue.push(tempNode.rightChild);

      if (cb !== null) cb(tempNode);
      else returnArray.push(tempNode.value);
    }

    if (cb === null) return returnArray;
    return undefined;
  }

  function preOrderTraversal(rootNode, cb = null) {
    if (rootNode !== null) {
      if (cb !== null) {
        cb(rootNode);
        preOrderTraversal(rootNode.leftChild, cb);
        preOrderTraversal(rootNode.rightChild, cb);
      } else {
        const tmpArray = [rootNode.value];
        if (rootNode.leftChild === null && rootNode.rightChild === null)
          return tmpArray;
        if (rootNode.leftChild === null)
          return tmpArray.concat(preOrderTraversal(rootNode.rightChild, cb));
        if (rootNode.rightChild === null)
          return tmpArray.concat(preOrderTraversal(rootNode.leftChild, cb));

        return tmpArray.concat(
          preOrderTraversal(rootNode.leftChild, cb),
          preOrderTraversal(rootNode.rightChild, cb),
        );
      }
    }
    return undefined;
  }

  function preOrder(cb = null) {
    return preOrderTraversal(root, cb);
  }

  function inOrderTraversal(rootNode, cb) {
    if (rootNode !== null) {
      if (cb !== null) {
        inOrderTraversal(rootNode.leftChild, cb);
        cb(rootNode);
        inOrderTraversal(rootNode.rightChild, cb);
      } else {
        const tmpArray = [];
        if (rootNode.leftChild === null && rootNode.rightChild === null)
          return tmpArray.concat(rootNode.value);
        if (rootNode.leftChild === null)
          return tmpArray.concat(
            rootNode.value,
            inOrderTraversal(rootNode.rightChild, cb),
          );
        if (rootNode.rightChild === null)
          return tmpArray.concat(
            inOrderTraversal(rootNode.leftChild, cb),
            rootNode.value,
          );

        return tmpArray.concat(
          inOrderTraversal(rootNode.leftChild, cb),
          rootNode.value,
          inOrderTraversal(rootNode.rightChild, cb),
        );
      }
    }
    return undefined;
  }

  function inOrder(cb = null) {
    return inOrderTraversal(root, cb);
  }

  function postOrderTraversal(rootNode, cb) {
    if (rootNode !== null) {
      if (cb !== null) {
        postOrderTraversal(rootNode.leftChild, cb);
        postOrderTraversal(rootNode.rightChild, cb);
        cb(rootNode);
      } else {
        const tmpArray = [];
        if (rootNode.leftChild === null && rootNode.rightChild === null)
          return tmpArray.concat(rootNode.value);
        if (rootNode.leftChild === null)
          return tmpArray.concat(
            postOrderTraversal(rootNode.rightChild, cb),
            rootNode.value,
          );
        if (rootNode.rightChild === null)
          return tmpArray.concat(
            postOrderTraversal(rootNode.leftChild, cb),
            rootNode.value,
          );

        return tmpArray.concat(
          postOrderTraversal(rootNode.leftChild, cb),
          postOrderTraversal(rootNode.rightChild, cb),
          rootNode.value,
        );
      }
    }
    return undefined;
  }

  function postOrder(cb = null) {
    return postOrderTraversal(root, cb);
  }

  function getHeight(node) {
    if (node === null) return 0;

    return 1 + Math.max(getHeight(node.leftChild), getHeight(node.rightChild));
  }

  function height(node) {
    return Math.max(getHeight(node.leftChild), getHeight(node.rightChild));
  }

  function getDepth(rootNode, value) {
    if (rootNode === null) return 0;
    const rootValue = rootNode.value;
    if (value < rootValue) return 1 + getDepth(rootNode.leftChild, value);
    if (value > rootValue) return 1 + getDepth(rootNode.rightChild, value);
    if (value === rootValue) return 0;
  }

  function depth(node) {
    if (findEntry(root, node.value) !== null) return getDepth(root, node.value);
    return undefined;
  }

  function checkBalance(rootNode) {
    if (rootNode === null) return 0;
    const leftBalance = checkBalance(rootNode.leftChild);
    const rightBalance = checkBalance(rootNode.rightChild);
    if (Math.abs(leftBalance - rightBalance) > 1) return -1;
    return Math.max(leftBalance, rightBalance) + 1;
  }

  function isBalanced() {
    if (root === null) return true;
    if (checkBalance(root) === -1) return false;
    return true;
  }

  function rebalance() {
    const newArray = inOrderTraversal(root, null);
    buildTree(newArray);
  }

  function getRoot() {
    return root;
  }

  buildTree(data);
  return {
    buildTree,
    insert,
    deleteItem,
    findValue,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
    getRoot,
  };
}

export default BSTFactory;
