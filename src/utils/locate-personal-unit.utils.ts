export function LocatePersonalUnitUtils(wei:any,decimal:number){  
  const numero = wei.toString(); // Como string com zeros como casas decimais

  // Encontre o índice do último dígito diferente de zero na parte decimal
  const indiceUltimoDigitoNaoZero = [...numero].reverse().findIndex(digito => digito !== '0');
  
  // Separe a parte inteira e a parte decimal
  const indicePontoDecimal = numero.length - (indiceUltimoDigitoNaoZero);
  const parteInteira = numero.slice(0, indicePontoDecimal);
  const parteDecimal = numero.slice(indicePontoDecimal);
  
  // Formate a parte inteira com separadores de milhares (pontos)
  const parteInteiraFormatada = BigInt(parteInteira).toLocaleString('pt-BR');
  
  // Combine a parte inteira formatada com a parte decimal
  const numeroFormatado = `${parteInteiraFormatada},${parteDecimal}`;
  
 return numeroFormatado
  
  
}