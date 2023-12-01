/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const symbolPlayerO = 'O';
const emptyPlay = ' ';

export class Game {
  private _lastSymbol = emptyPlay;
  private _board: Board = new Board();

  public Play(symbol: string, colone: number, ligne: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(colone, ligne);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, colone, ligne);
  }

  private isFirstMove(): boolean{
    return this._lastSymbol == emptyPlay
  }

  private isFirstPlayerSymbol(symbol: string): boolean{
    return symbol == symbolPlayerO
  }

  private validateFirstMove(playerSymbol: string) {
    if (this.isFirstMove()) {
      if (this.isFirstPlayerSymbol(playerSymbol)) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(colone: number, ligne: number) {
    if (!this._board.isEmptyAt(colone,ligne)) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, colone: number, ligne: number) {
    this._board.AddTileAt(player, colone, ligne);
  }

  public Winner(): String {
    if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
      return this._board.getSymbolAt(firstRow, firstColumn);
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
      return this._board.getSymbolAt(secondRow, firstColumn);
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
      return this._board.getSymbolAt(thirdRow, firstColumn);
    }

    return emptyPlay;
  }

  private isRowFull(row: number) {
    return (
      !this._board.isEmptyAt(row, firstColumn) &&
      !this._board.isEmptyAt(row, secondColumn) &&
      !this._board.isEmptyAt(row, thirdColumn)
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this._board.getTilelAt(row, firstColumn).equals(this._board.getTilelAt(row, secondColumn)) 
      &&
      this._board.getTilelAt(row, secondColumn).equals(this._board.getTilelAt(row, thirdColumn))
    );
  }
}

class Tile {
  private colone: number;
  private ligne: number;
  private symbol: string;

  constructor(colone: number, ligne: number, symbol: string) {
    this.colone= colone;
    this.ligne = ligne;
    this.symbol = symbol
  }

  public getColone(): number {
    return this.colone
  }

  public getligne() : number{
    return this.ligne
  }

  public getSymbol() : string{
    return this.symbol
  }

  public setSymbol(symbol : string){
      this.symbol = symbol
  }

  public hasSymbol(symbol: string) {
    return this.symbol == symbol
  }
  
  public equals(tile: Tile) {
    return this.symbol == tile.getSymbol()
  }

}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = firstRow; i <= thirdRow; i++) {
      for (let j = firstColumn; j <= thirdColumn; j++) {
        const tile = new Tile( i, j,emptyPlay );
        this._plays.push(tile);
      }
    }
  }

  public isSymbolAt(symbol: string, colone: number, ligne: number): Boolean {
    return this.getSymbolAt(colone, ligne) == symbol; 
  }

  public isEmptyAt(colone: number, ligne: number): Boolean {
    return this.isSymbolAt(emptyPlay, colone, ligne); 
  }

  public getTilelAt(colone: number, ligne: number): Tile {
    return this._plays.find((t: Tile) => t.getColone() == colone && t.getligne() == ligne)!;
  }

  public getSymbolAt(colone: number, ligne: number): String {
    return this.getTilelAt(colone, ligne).getSymbol();
  }

  public AddTileAt(symbol: string, colone: number, ligne: number): void {
    this._plays.find((t: Tile) => t.getColone() == colone && t.getligne() == ligne)?.setSymbol(symbol);
  }
}
