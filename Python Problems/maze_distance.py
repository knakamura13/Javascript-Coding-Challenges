# def move_right(curr):
# 	next_pos = curr
# 	next_pos[0] += 1

# 	if next_pos[0]:
# 		return next_pos

# 	return curr

# def move_down(curr):
# 	next_pos = curr
# 	next_pos[1] += 1

# 	if next_pos[1]:
# 		return next_pos

# 	return curr

# def move_left(curr):
# 	next_pos = curr
# 	next_pos[0] -= 1

# 	if next_pos[0]:
# 		return next_pos

# 	return curr

# def move_up(curr):
# 	next_pos = curr
# 	next_pos[1] -= 1

# 	if next_pos[1]:
# 		return next_pos

# 	return curr

# def next_valid_pos(curr):
# 	if move_right(curr) != curr:
# 		return move_right(curr)

# 	if move_down(curr) != curr:
# 		return move_down(curr)

# 	if move_left(curr) != curr:
# 		return move_left(curr)

# 	if move_up(curr) != curr:
# 		return move_up(curr)

# 	return curr


# def solution(maze):
# 	moves = 0

# 	visited = set()		# set of [int, int]

# 	state = {
# 		'pos': [0, 0],
# 		'is_finish': False
# 	}

# 	curr = state['pos']

# 	prev = curr

# 	while not state['is_finish']:
# 		if next_valid_pos(curr) != curr:
# 			prev = curr
# 			curr = next_valid_pos(curr)
# 			state['pos'] = curr
# 			visited.add(curr)

# 			moves += 1

# 			if maze[curr[0]][curr[1]] == 2:
# 				state['is_finish'] = True
# 		else:
# 			curr = prev
# 			moves -= 1

# 	return moves





def solution(maze):
	distance = 0
	is_finish = False
	pos = {
		'x': 0,
		'y': 0
	}

	visited = [pos]

	prev = pos
	while maze[pos['y']][pos['x']] != 2:
		distance += 1

		print(visited)

		# Try move right
		if pos['x'] + 1 < len(maze[0]) and maze[pos['y']][pos['x'] + 1] and {'y': pos['y'], 'x': pos['x'] + 1} not in visited:
			pos['x'] += 1
			print('moved right')
			visited.append(pos)
			continue

		# Try move down
		elif pos['y'] + 1 < len(maze) and maze[pos['y'] + 1][pos['x']] and {'y': pos['y'] + 1, 'x': pos['x']} not in visited:
			pos['y'] += 1
			print('moved down')
			visited.append(pos)
			continue

		# Try move left
		elif pos['x'] - 1 and maze[pos['y']][pos['x'] - 1] and {'y': pos['y'], 'x': pos['x'] - 1} not in visited:
			pos['x'] -= 1
			print('moved left')
			visited.append(pos)
			continue

		# Try move up
		elif pos['y'] - 1 and maze[pos['y'] - 1][pos['x']] and {'y': pos['y'] - 1, 'x': pos['x']} not in visited:
			pos['y'] += -1
			print('moved up')
			visited.append(pos)
			continue

		else:
			# Subtract from distance and back-track.
			distance -= 1
			pos = prev

	return distance


maze1 = [[1, 0, 0],
		[1, 0, 0],
		[1, 1, 2],]

maze2 = [[1, 1, 1],
		 [0, 0, 1],
		 [1, 1, 1],
		 [1, 0, 0],
		 [1, 1, 2],]
print(solution(maze2))