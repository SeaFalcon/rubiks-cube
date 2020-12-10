const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Node{
  constructor(data){
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class SimpleDeque{
  constructor(){
    this.count = 0;
    this.head = null;
    this.tail = null;
  }

  pushFront(data){
    const node = new Node(data);
    
    if(this.head === null){
      this.tail = node;
    }else{
      this.head.prev = node;
      node.next = this.head;
    }
    this.head = node;

    return ++this.count;
  }

  pushBack(data){
    const node = new Node(data);
    
    if(this.head === null){
      this.head = node;
    }else{
      node.prev = this.tail;
      this.tail.next = node;
    }
    this.tail = node;

    return ++this.count;
  }

  popFront(){
    if(this.head === null) return false;
    
    let data = this.head.data;
    this.head = this.head.next;
    this.count--;
    if(this.count === 0) this.tail = null;

    return data;
  }

  popBack(){
    if(this.head === null) return false;
    
    let data = this.tail.data;
    this.tail = this.tail.prev;
    this.count--;
    if(this.count === 0) this.head = null;

    return data;
  }
  
  toString(){
    let resultString = '';

    let node = this.head;
    
    for(let i=0; i<this.count; i++){
      resultString += node.data;
      node = node.next;
    }

    return resultString;
  }
}

var commandFunctions = {
  'R': (simpleDeque, count) => {
    if(count < 0) return commandFunctions['L'](simpleDeque, -count);
    
    for(let i=0; i<count; i++){
      simpleDeque.pushFront(simpleDeque.popBack());
    }
    return simpleDeque.toString();
  },
  'L': (simpleDeque, count) => {
    if(count < 0) return commandFunctions['R'](simpleDeque, -count);
    
    for(let i=0; i<count; i++){
      simpleDeque.pushBack(simpleDeque.popFront());
    }
    return simpleDeque.toString();
  }
}

rl.setPrompt('> ');
rl.prompt();
rl.on('line', function (line) {
  let [word, count, command] = line.split(' ');

  const simpleDeque = new SimpleDeque();

  word.split('').forEach(v => simpleDeque.pushBack(v));
  count = +count;
  if (command) {
    command = command.toUpperCase();
  }

  if (!commandFunctions[command]) return;

  const result = commandFunctions[command](simpleDeque, count);

  console.log(result);

  rl.setPrompt('> ');
  rl.prompt();
})
  .on('close', function () {
    process.exit();
  });