class Solution:
    def filterRestaurants(self, restaurants: List[List[int]], veganFriendly: int, maxPrice: int, maxDistance: int) -> List[int]:
    	#restaurants[i] = [id, rating, veganFriendly, price, distance]
    	# if restaurants list is empty
        if not restaurants:
            return []
        
        res = []
        for idRest, ratingRest, vFrndly, mPrice, maxDist in restaurants:
        	#          1                 1           1
            if not veganFriendly or (vFrndly and veganFriendly):
                if mPrice <= maxPrice and maxDist <= maxDistance:
                    res.append([idRest, ratingRest])
        
        return [i for i, rating in sorted(res, key = lambda x:(x[1], x[0]), reverse = True)]
        