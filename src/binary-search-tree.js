const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.node = null;
  }
  
  root() {
    return this.node;
  }

  add(data) {
    let nodeItem = this.root();
    
    if(nodeItem === null){
      this.node = createNode(data);
      return;
    } 

    function createNode(data) {
      return new Node(data);
    }

    function addWithin(nodeItem) {
      if (data < nodeItem.data) {
          if (nodeItem.left === null) {
              nodeItem.left = createNode(data);
              return;
          } else if (nodeItem.left !== null) {
              return addWithin(nodeItem.left);
          }
      } else if (data > nodeItem.data) {
          if (nodeItem.right === null) {
              nodeItem.right = createNode(data);
              return;
          } else if (nodeItem.right !== null) {
              return addWithin(nodeItem.right);
          }
      } else {
          return null;
      }
    }

    return addWithin(nodeItem);
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    return findNode(this.node, data);

    function findNode(nodeItem, data) {
      if (!nodeItem) return null;

      if (nodeItem.data === data) return nodeItem;

      if (nodeItem.data > data) {
        return findNode(nodeItem.left, data);
      } else {
        return findNode(nodeItem.right, data);
      }
    }
  }

  remove(data) {
    return removeNode(this.node, data);

    function removeNode(nodeItem, data) {
      if (!nodeItem) return null;

      if (nodeItem.data > data) {
        nodeItem.left = removeNode(nodeItem.left, data)
        return nodeItem;
      } else if (nodeItem.data < data) {
        nodeItem.right = removeNode(nodeItem.right, data)
        return nodeItem;
      } else {
        if (!nodeItem.left && !nodeItem.right) return null;

        if (!nodeItem.left) {
          nodeItem = nodeItem.right;
          return nodeItem;
        }

        if (!nodeItem.right) {
          nodeItem = nodeItem.left;
          return nodeItem;
        }

        let minFromRight = nodeItem.right;

        while(minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        
        nodeItem.data = minFromRight.data;
        nodeItem.right = removeNode(nodeItem.right, minFromRight.data);

        return nodeItem;
      }
    }
  }

  min() {
    let nodeItem = this.root();
    while (nodeItem.left !== null) {
      nodeItem = nodeItem.left;
    }
    return nodeItem.data;
  }

  max() {
    let nodeItem = this.root();
    while (nodeItem.right !== null) {
      nodeItem = nodeItem.right;
    }
    return nodeItem.data;
  }
}



module.exports = {
  BinarySearchTree
};