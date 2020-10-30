class Solution:
    def subdomainVisits(self, cpdomains: List[str]) -> List[str]:
        if len(cpdomains) == 0:
            return []
        
        countDict = {}
        for domain in cpdomains:
            count, domain = domain.split(' ')
            if domain in countDict:
                countDict[domain] += int(count)
            else:
                countDict[domain] = int(count)
                
            #might need correction in case only top level domain arrives    
            splitDomain = domain.split('.')[1:]
            for i in range(len(splitDomain)):
                currDomain = '.'.join(j for j in splitDomain[i:])
                if currDomain in countDict:
                    countDict[currDomain] += int(count)
                else:
                    countDict[currDomain] = int(count)
                    
        res = []
        for key in countDict:
            res.append(str(countDict[key]) + ' ' + key)
        return res
        
        