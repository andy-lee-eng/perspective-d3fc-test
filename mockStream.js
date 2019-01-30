async function* asyncRandomNumbers() {
  while (true) {
    const response = await simulateWait();
    yield response;
  }
}

function simulateWait(){
  return new Promise((resolve,reject) => { setTimeout(() => {resolve(5)}, 500)});
}

const gen = asyncRandomNumbers();
let result = gen.next();
while(!result.done){
  console.log(result.value);
  result = gen.next();
}