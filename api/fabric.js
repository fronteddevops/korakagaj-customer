export default {
    GET_FABRIC: () => `/fabric`,
    GET_FilTER_FABRIC:(data)=>`/fabric?&fabricType=${data.fabricType}&printType=${data.printType}&usage=${data.usage}&properties=${data.properties}&weight=${data.weight}&transparency=${data.transparency}&reflection=${data.reflection}&construction=${data.construction}&handle=${data.handle}` 
  };      







