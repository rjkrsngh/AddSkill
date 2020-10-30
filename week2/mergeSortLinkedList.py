# Python3 program to merge sort of linked list 

# create Node using class Node. 
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def sortList(self, head: ListNode) -> ListNode:
        if head == None or head.next == None:
            return head

		# get the middle of the list 
        middle = self.getMiddle(head) 
        nexttomiddle = middle.next

		# set the next of middle node to None 
        middle.next = None

		# Apply mergeSort on left list 
        left = self.sortList(head) 
		
		# Apply mergeSort on right list 
        right = self.sortList(nexttomiddle) 

		# Merge the left and right lists 
        sortedlist = self.sortedMerge(left, right) 
        return sortedlist 
    
    def getMiddle(self, head): 
        if (head == None): 
            return head 

        begin = head 
        end = head 

        while (end.next != None and end.next.next != None): 
            begin = begin.next
            end = end.next.next
			
        return begin
    
    def sortedMerge(self, a, b): 
        result = None
		
		# Base cases 
        if a == None: 
            return b 
        if b == None: 
            return a 
			
		# pick either a or b and recur.. 
        if a.val <= b.val: 
            result = a 
            result.next = self.sortedMerge(a.next, b) 
        else: 
            result = b 
            result.next = self.sortedMerge(a, b.next) 
        return result
        
        