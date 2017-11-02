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