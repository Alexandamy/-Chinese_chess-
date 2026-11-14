// 棋盘数据：二维数组，10行9列
let board = [];
// 当前走棋方：red红方先走
let currentPlayer = 'red';
// 选中的棋子
let selectedPiece = null;

// 初始化棋盘数据
function initBoard() {
    // 清空棋盘
    board = Array(10).fill(null).map(() => Array(9).fill(null));
    
    // 初始化黑方棋子（顶部，行0-4）
    // 行0：车 马 相 仕 将 仕 相 马 车
    board[0][0] = { type: '车', color: 'black', row: 0, col: 0 };
    board[0][1] = { type: '马', color: 'black', row: 0, col: 1 };
    board[0][2] = { type: '相', color: 'black', row: 0, col: 2 };
    board[0][3] = { type: '士', color: 'black', row: 0, col: 3 };
    board[0][4] = { type: '将', color: 'black', row: 0, col: 4 };
    board[0][5] = { type: '士', color: 'black', row: 0, col: 5 };
    board[0][6] = { type: '相', color: 'black', row: 0, col: 6 };
    board[0][7] = { type: '马', color: 'black', row: 0, col: 7 };
    board[0][8] = { type: '车', color: 'black', row: 0, col: 8 };
    
    // 行2：炮
    board[2][1] = { type: '炮', color: 'black', row: 2, col: 1 };
    board[2][7] = { type: '炮', color: 'black', row: 2, col: 7 };
    
    // 行3：卒
    for (let i = 0; i < 9; i += 2) {
        board[3][i] = { type: '卒', color: 'black', row: 3, col: i };
    }
    
    // 初始化红方棋子（底部，行5-9）
    // 行9：车 马 相 仕 帅 仕 相 马 车
    board[9][0] = { type: '车', color: 'red', row: 9, col: 0 };
    board[9][1] = { type: '马', color: 'red', row: 9, col: 1 };
    board[9][2] = { type: '相', color: 'red', row: 9, col: 2 };
    board[9][3] = { type: '仕', color: 'red', row: 9, col: 3 };
    board[9][4] = { type: '帅', color: 'red', row: 9, col: 4 };
    board[9][5] = { type: '仕', color: 'red', row: 9, col: 5 };
    board[9][6] = { type: '相', color: 'red', row: 9, col: 6 };
    board[9][7] = { type: '马', color: 'red', row: 9, col: 7 };
    board[9][8] = { type: '车', color: 'red', row: 9, col: 8 };
    
    // 行7：炮
    board[7][1] = { type: '炮', color: 'red', row: 7, col: 1 };
    board[7][7] = { type: '炮', color: 'red', row: 7, col: 7 };
    
    // 行6：兵
    for (let i = 0; i < 9; i += 2) {
        board[6][i] = { type: '兵', color: 'red', row: 6, col: i };
    }
}