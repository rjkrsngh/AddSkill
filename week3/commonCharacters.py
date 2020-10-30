class Solution:
    def commonChars(self, A: List[str]) -> List[str]:
        if len(A) == 0:
            return []
        if len(A) == 1:
            return list(A[0])
        
        A.sort(key = len)
        
        minDict = {}
        
        for char in A[0]:
            if char in minDict:
                minDict[char] += 1
            else:
                minDict[char] = 1
                
        for string in A[1:]:
            currDict = {}
            for char in string:
                if char in minDict:
                    if char in currDict:
                        currDict[char] += 1
                    else:
                        currDict[char] = 1
            
            #remove enrty from the minimum dictioanry for the non common elements in smallest string
            for char in minDict:
                if char not in currDict:
                    minDict[char] = -1
                if char in currDict:
                    if minDict[char] > currDict[char]:
                        minDict[char] = currDict[char]
                    
        res = []
        for char in minDict:
            if minDict[char] > 0:
                for i in range(minDict[char]):
                    res.append(char)
        return res
        