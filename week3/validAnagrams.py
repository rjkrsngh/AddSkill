class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        dictS = {}
        for char in s:
            if char in dictS.keys():
                dictS[char] += 1
            else:
                dictS[char] = 1
        print(dictS)
        dictT = {}
        for char in t:
            if char in dictT.keys():
                dictT[char] += 1
            else:
                dictT[char] = 1
                
        print(dictT)
                
        return dictS == dictT
        