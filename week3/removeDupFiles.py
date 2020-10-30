from collections import defaultdict

class Solution:
    def findDuplicate(self, paths: List[str]) -> List[List[str]]:
        paths_array = []
        dic = defaultdict(list)
        result = []
        
        for string in paths:
            temp = string.split()
            if len(temp) > 2:
                for i in range(1, len(temp)):
                    paths_array.append(temp[0] + '/' + temp[i])
            else:
                paths_array.append(temp[0] + '/' + temp[1])
                
        #print(paths_array)
        for path in paths_array:
            temp = path.split('(')
            dic[temp[1]].append(temp[0])
            
        #print(dic)
        for i in dic:
            if len(dic[i]) > 1:
                result.append(dic[i])
                
        return result