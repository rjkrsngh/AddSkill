class Solution:
    def exclusiveTime(self, n, logs):
        
        res = [0]*n
        stack = []
        prevEvt = -1
        for log in logs:
            pid,flag,time = log.split(':')
            if flag == 'start':
                if stack:
                    res[stack[-1]] += int(time)-1-prevEvt
                    print('stack exists')
                    print(res)
                stack.append(int(pid))
                print(stack)
                prevEvt = int(time)-1 
            else:
                print('popping')
                res[stack.pop()] += int(time)-prevEvt
                print(res)
                prevEvt = int(time)
        return res