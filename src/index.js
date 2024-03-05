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
  for (let i = 0; i < 30; i += 1) {
    let num = Math.random() * 100;
    num = Math.floor(num);
    tempArray.push(num);
  }

  tempArray.sort();

  for (let i = 1; i < 30; i += 1) {
    if (tempArray[i - 1] === tempArray[i]) tempArray.splice(i, 1);
  }

  return tempArray;
}
