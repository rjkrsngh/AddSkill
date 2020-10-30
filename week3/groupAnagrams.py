class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        groupDict = {}
        for string in strs:
            sortedString = "".join(sorted(string))
            if sortedString in groupDict.keys():
                groupDict[sortedString].append(string)
            else:
                groupDict[sortedString] = [string]
        res = []
        for keys in groupDict:
            res.append(groupDict[keys])
            
        return res