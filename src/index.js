import BSTFactory from './TreeFactory.js';

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

function createArray() {
  const tempArray = [];
  for (let i = 0; i < 20; i += 1) {
    let num = Math.random() * 100;
    num = Math.floor(num);
    tempArray.push(num);
  }

  tempArray.sort((a, b) => {
    if (a > b) return 1;
    if (a === b) return 0;
    return -1;
  });

  for (let i = 1; i < 20; i += 1) {
    if (tempArray[i - 1] === tempArray[i]) tempArray.splice(i, 1);
  }

  return tempArray;
}

function unbalanceTree(tree) {
  for (let i = 0; i < 3; i += 1) {
    const num = Math.floor(Math.random() * 100 + 100);
    tree.insert(num);
  }
}

function scriptDriver() {
  const tempArray = createArray();
  console.log(tempArray);
  const tree = BSTFactory(tempArray);
  prettyPrint(tree.getRoot());

  console.log(`Is tree balanced: ${tree.isBalanced()}`);
  console.log('InOrder:');
  console.log(tree.inOrder());
  console.log('PreOrder:');
  console.log(tree.preOrder());
  console.log('PostOrder:');
  console.log(tree.postOrder());

  unbalanceTree(tree);
  prettyPrint(tree.getRoot());
  console.log(`Is tree balanced: ${tree.isBalanced()}`);
  console.log('Rebalancing...');
  tree.rebalance();

  prettyPrint(tree.getRoot());
  console.log(`Is tree balanced: ${tree.isBalanced()}`);
  console.log('InOrder:');
  console.log(tree.inOrder());
  console.log('PreOrder:');
  console.log(tree.preOrder());
  console.log('PostOrder:');
  console.log(tree.postOrder());
}

scriptDriver();
