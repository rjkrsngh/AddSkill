class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        if len(s) == 0:
            return t
        res = 0
        for char in s:
            res ^= ord(char)
            
        for char in t:
            res ^= ord(char)
            
        return chr(res)