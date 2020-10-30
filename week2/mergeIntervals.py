class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key = lambda x: x[0])  
          
        # array to hold the merged intervals 
        res = [] 
        s = -999999
        mx = -999999
        for i in range(len(intervals)): 
            a = intervals[i] 
            if a[0] > mx: 
                if i != 0: 
                    res.append([s,mx]) 
                mx = a[1] 
                s = a[0] 
            else: 
                if a[1] >= mx: 
                    mx = a[1] 
        #'max' value gives the last point of  
        # that particular interval 
        # 's' gives the starting point of that interval 
        # 'm' array contains the list of all merged intervals 
        if mx != -999999 and [s, mx] not in res: 
            res.append([s, mx]) 
        return res

print(Solution().merge([[1,3],[2,6],[8,10],[15,18]]))