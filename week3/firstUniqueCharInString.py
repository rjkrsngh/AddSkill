class Solution:
    def firstUniqChar(self, s: str) -> int:
        if len(s) == 0:
            return -1
        
        resList = []
        countDict = {}

        # r and n are the markers meaning removed and new respectively
        for i in range(len(s)):
            if s[i] in countDict:
                if s[i] in resList:
                    resList.remove(s[i])
                countDict[s[i]] = [i, 'r']
            else:
                resList.append(s[i])
                countDict[s[i]] = [i, 'n']
        
        if len(resList):
            for char in resList:
                if countDict[char][1] == 'n':
                    return countDict[char][0]
        return -1
                
        