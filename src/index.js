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

const dataSet = [2, 5, 13, 22, 29, 31, 36, 45];
const binarySearchTree = BSTFactory();
let rootNode = binarySearchTree.buildTree(dataSet);
prettyPrint(rootNode);
console.log('------------------------');
binarySearchTree.insert(4);
binarySearchTree.insert(10);
binarySearchTree.insert(30);
prettyPrint(rootNode);

console.log('-------------------------');
binarySearchTree.deleteItem(22);
prettyPrint(binarySearchTree.getRoot());

console.log('-------------------------');

rootNode = binarySearchTree.getRoot();
const leafNode = binarySearchTree.findValue(45);
console.log(binarySearchTree.height(leafNode));
console.log(binarySearchTree.depth(rootNode));
