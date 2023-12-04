/* eslint-disable */

const firstRowIndex = 0;
const secondRowIndex = 1;
const thirdRowIndex = 2;
const firstColumnIndex = 0;
const secondColumnIndex = 1;
const thirdColumnIndex = 2;

const firstPlayerSymbol = 'O';
const emptyTileSymbol = ' ';

export class Game {
  private _lastPlayedSymbol = emptyTileSymbol;
  private _board: Board = new Board();

  public Play(playedSymbol: string, rowIndex: number, columnIndex: number): void {
    this.validateFirstMove(playedSymbol);
    this.validatePlayer(playedSymbol);
    this.validatePositionIsEmpty(rowIndex, columnIndex);
    this.updateLastPlayer(playedSymbol);
    this.updateBoard(playedSymbol, rowIndex, columnIndex);
  }

  private validateFirstMove(playerSymbol: string) {
    if (this._lastPlayedSymbol == emptyTileSymbol) {
      if (playerSymbol == firstPlayerSymbol) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(playerSymbol: string) {
    if (playerSymbol == this._lastPlayedSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(rowIndex: number, columnIndex: number) {
    if (this._board.TileAt(rowIndex, columnIndex).isNotEmpty) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(playerSymbol: string) {
    this._lastPlayedSymbol = playerSymbol;
  }

  private updateBoard(playerSymbol: string, rowIndex: number, columnIndex: number) {
    this._board.AddTileAt(playerSymbol, rowIndex, columnIndex);
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

class Tile {
  private rowIndex: number = 0;
  private columnIndex: number = 0;
  private tileSymbol: string = ' ';

  constructor(rowIndex: number, columnIndex: number, tileSymbol: string) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.tileSymbol = tileSymbol;
  }

  get Symbol() {
    return this.tileSymbol;
  }

  get isNotEmpty() {
    return this.Symbol !== emptyTileSymbol;
  }

  hasSameSymbolAs(tileToCompare: Tile) {
    return this.Symbol === tileToCompare.Symbol;
  }

  hasSameCoordinatesAs(tileToCompare: Tile) {
    return this.rowIndex == tileToCompare.rowIndex && this.columnIndex == tileToCompare.columnIndex;
  }

  updateSymbol(newSymbol: string) {
    this.tileSymbol = newSymbol;
  }
}

class Board {
  private _tiles: Tile[] = [];

  constructor() {
    for (let rowIndex = firstRowIndex; rowIndex <= thirdRowIndex; rowIndex++) {
      for (let columnIndex = firstColumnIndex; columnIndex <= thirdColumnIndex; columnIndex++) {
        this._tiles.push(new Tile(rowIndex, columnIndex, emptyTileSymbol));
      }
    }
  }

  public TileAt(rowIndex: number, columnIndex: number): Tile {
    return this._tiles.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(rowIndex, columnIndex, emptyTileSymbol)))!;
  }

  public AddTileAt(symbol: string, rowIndex: number, columnIndex: number): void {
    this._tiles
      .find((t: Tile) => t.hasSameCoordinatesAs(new Tile(rowIndex, columnIndex, symbol)))!
      .updateSymbol(symbol);
  }

  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(firstRowIndex) && this.isRowFullWithSameSymbol(firstRowIndex)) {
      return this.TileAt(firstRowIndex, firstColumnIndex)!.Symbol;
    }

    if (this.isRowFull(secondRowIndex) && this.isRowFullWithSameSymbol(secondRowIndex)) {
      return this.TileAt(secondRowIndex, firstColumnIndex)!.Symbol;
    }

    if (this.isRowFull(thirdRowIndex) && this.isRowFullWithSameSymbol(thirdRowIndex)) {
      return this.TileAt(thirdRowIndex, firstColumnIndex)!.Symbol;
    }

    return emptyTileSymbol;
  }

  private isRowFull(rowIndex: number) {
    return (
      this.TileAt(rowIndex, firstColumnIndex)!.isNotEmpty &&
      this.TileAt(rowIndex, secondColumnIndex)!.isNotEmpty &&
      this.TileAt(rowIndex, thirdColumnIndex)!.isNotEmpty
    );
  }

  private isRowFullWithSameSymbol(rowIndex: number) {
    return (
      this.TileAt(rowIndex, firstColumnIndex)!.hasSameSymbolAs(this.TileAt(rowIndex, secondColumnIndex)!) &&
      this.TileAt(rowIndex, thirdColumnIndex)!.hasSameSymbolAs(this.TileAt(rowIndex, secondColumnIndex)!)
    );
  }
}
