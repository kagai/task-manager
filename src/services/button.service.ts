import { Injectable } from '@nestjs/common';

@Injectable()
export class ButtonService {
  count_symbols(numberOfClicks: number): [number, number] {
    let atSymbolCount = 1;
    let ampersandSymbolCount = 0;
    let previousAmpersandCount = 0;
    let currentAmpersandCount = 0;

    while (numberOfClicks !== 0) {
      previousAmpersandCount = ampersandSymbolCount;
      currentAmpersandCount = ampersandSymbolCount + atSymbolCount * 2;

      atSymbolCount = previousAmpersandCount;
      ampersandSymbolCount = currentAmpersandCount;
      numberOfClicks -= 1;
    }

    return [previousAmpersandCount, currentAmpersandCount];
  }
}
