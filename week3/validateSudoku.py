class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        #validate row
        #print('validating row')
        for row in range(9):
            currSet = set()
            for col in range(9):
                if board[row][col] != '.':
                    #print('curr elem: ', board[row][col])
                    if board[row][col] not in currSet:
                        #print('not found, so adding {}'.format(board[row][col]))
                        currSet.add(board[row][col])
                    else:
                        #print('row: {0} validation failed, set: {1}'.format(row, currSet))
                        return False
                
        # validate all columns
        #print('validating columns')
        for col in range(9):
            colSet = set()
            for row in range(9):
                if board[row][col] != '.':
                    #print('curr elem: {}'.format(board[row][col]))
                    if board[row][col] not in colSet:
                        #print('not found, so adding {}'.format(board[row][col]))
                        colSet.add(board[row][col])
                    else:
                        #print('column: {} validation failed'.format(col))
                        return False

        #validate 3x3 grids
        #print('validating grids')
        grid1 = []
        grid2 = []
        grid3 = []
        for row in range(9):
            for col in range(9):
                if board[row][col] != '.':
                    if col in range(0,3):
                        #insert in grid1
                        if board[row][col] in grid1:
                            return False
                        else:
                            grid1.append(board[row][col])
                    
                    elif col in range(3,6):
                        #insert in grid2
                        if board[row][col] in grid2:
                            return False
                        else:
                            grid2.append(board[row][col])
                    elif col in range(6,9):
                        #insert in grid3
                        if board[row][col] in grid3:
                            return False
                        else:
                            grid3.append(board[row][col])
            
            if row == 2 or row == 5:
                grid1.clear()
                grid2.clear()
                grid3.clear()
        
        return True

            
        