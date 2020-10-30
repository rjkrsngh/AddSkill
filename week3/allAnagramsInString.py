class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        if len(p) == 0:
            return []
        
        dictP = {}
        currDictS = {}
        res = []
        #form the dictionary of pattern P
        for char in p:
            if char not in dictP:
                dictP[char] = 1
            else:
                dictP[char] += 1
                
        #form the current dictionary of len P and compare
        leftBound = 0
        rightBound = 0
        while rightBound<len(s):
            # insert curr character in currDictS
            if s[rightBound] in currDictS:
                currDictS[s[rightBound]] += 1
            else:
                currDictS[s[rightBound]] = 1
                
            #if the legth of window == len(pattern)
            if rightBound - leftBound + 1 == len(p):
                #print('length reached')
                if currDictS == dictP:
                    #if it is an anagram, insert leftBound into result
                    res.append(leftBound)
                    
                #Remove the last character from the dictionary of current window
                if currDictS[s[leftBound]] > 1:
                    currDictS[s[leftBound]] -= 1
                else:
                    del(currDictS[s[leftBound]])
                leftBound += 1
            
            rightBound += 1
        
        return res
        