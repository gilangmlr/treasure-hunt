/*
* class Node which has property x, y, obstacle, g, h, and parent.
* default value for g & h is 0
* g = step cost from start to this node
* h = heuristic from this to goal
* obstacle denotes whether the node can be passed or not
* parent determines from which node this node is visited
* seen = node added to the frontier
* visited = node is in the explored set
*/
function Node(x, y, obstacle, g, h, parent, seen, visited) {
  this.x = x;
  this.y = y;
  this.obstacle = obstacle;
  this.g = g || 0;
  this.h = h || 0;
  this.parent = parent || null;
  this.seen = seen || false;
  this.visited = visited || false;
}