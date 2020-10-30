class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        freqLookupTable = {}
        for elem in nums:
            if elem not in freqLookupTable:
                freqLookupTable[elem] = 1
            else:
                freqLookupTable[elem] += 1
                
        srtdFreqTable = sorted(freqLookupTable.items(), key = lambda x : x[1], reverse=True)
        res = []
        for i in range(k):
            res.append(srtdFreqTable[i][0])
            
        return res