<script lang="ts">
	// Declare our imports, variables, and functions
	import { supabase } from "$lib/supabaseClient";

	export let data: {
		todos: {
			id: string;
			name: string;
			goal: string;
			complete_by: string;
		}[];
	};

	let newTodo = { name: '', goal: '', complete_by: '' };
	let editTaskId: string | null = null;
	let editedTodo = { name: '', goal: '', complete_by: '' };


	// Insert a new row into the todo table
	async function addTask() {
		if (newTodo.name && newTodo.goal && newTodo.complete_by) {
			const { data: insertedTodo } = await supabase
				.from('todo')
				.insert([newTodo])
				.select()
				.single();

			data.todos = [...data.todos, insertedTodo];
			newTodo = { name: '', goal: '', complete_by: '' };
		}
	}

	// Delete a row from the todo table
	async function removeTask(id: string) {
		const {} = await supabase
			.from('todo')
			.delete()
			.eq('id', id);


		// Filter out the tasks that have the same id
		data.todos = data.todos.filter(todo => todo.id !== id);
	}

	// Sets the editing mode to the row id
	function startEdit(task: { id: string; name: string; goal: string; complete_by: string }) {
		editTaskId = task.id;
		editedTodo = { ...task };
	}

	// Saves the updated row to the table
	async function saveEdit() {
		if (!editTaskId) return;

		const { } = await supabase
			.from('todo')
			.update({
				name: editedTodo.name,
				goal: editedTodo.goal,
				complete_by: editedTodo.complete_by
			})
			.eq('id', editTaskId);
		
		// Find and map the task with the new data
		data.todos = data.todos.map(todo =>
			todo.id === editTaskId ? { ...todo, ...editedTodo } : todo
		);

		editTaskId = null;
	}

	// Unset the editing mode
	function cancelEdit() {
		editTaskId = null;
	}
</script>

<div class="max-w-3xl mx-auto p-6">
	<!-- Header -->
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-3xl font-bold text-center">Todo List</h1>
	</div>
	

	<!-- Top Form -->
	<form class="mb-6" on:submit|preventDefault={addTask}>
		<div class="grid gap-4 mb-4">
			<input
				type="text"
				placeholder="Name"
				bind:value={newTodo.name}
				class="border rounded p-2 w-full"
			/>
			<input
				type="text"
				placeholder="Goal"
				bind:value={newTodo.goal}
				class="border rounded p-2 w-full"
			/>
			<input
				type="date"
				bind:value={newTodo.complete_by}
				class="border rounded p-2 w-full"
				min={new Date().toISOString().split('T')[0]}
			/>
		</div>
		<button
			type="submit"
			class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
		>
			Add Task
		</button>
	</form>

	<!-- First check if there are any tasks -->
	{#if data.todos.length === 0}
		<p class="text-gray-500 text-center">No tasks found.</p>
	{:else}
		<div class="grid gap-4">
			<!-- Check to see if we are editing by checking the bool -->
			{#each data.todos as todo (todo.id)}
				<div class="bg-white rounded-2xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition">
					{#if editTaskId === todo.id}
						<input
							type="text"
							bind:value={editedTodo.name}
							class="border rounded p-2 w-full mb-2"
						/>
						<input
							type="text"
							bind:value={editedTodo.goal}
							class="border rounded p-2 w-full mb-2"
						/>
						<input
							type="date"
							bind:value={editedTodo.complete_by}
							class="border rounded p-2 w-full mb-2"
							min={new Date().toISOString().split('T')[0]}
						/>
						<div class="flex gap-2">
							<button
								on:click={saveEdit}
								class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
							>
								Save
							</button>
							<button
								on:click={cancelEdit}
								class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
							>
								Cancel
							</button>
						</div>
					{:else}
						<h2
							class="text-xl font-semibold"
							on:dblclick={() => startEdit(todo)}
						>
							{todo.name}
						</h2>
						<p
							class="text-gray-700 mb-2"
							on:dblclick={() => startEdit(todo)}
						>
							{todo.goal}
						</p>
						<p
							class="text-sm text-gray-500"
							on:dblclick={() => startEdit(todo)}
						>
							Complete by:
							{new Date(new Date(todo.complete_by).setDate(new Date(todo.complete_by).getDate() + 1)).toLocaleDateString()}
						</p>
						<button
							on:click={() => removeTask(todo.id)}
							class="text-lime-500 mt-2 hover:underline"
						>
							Complete
						</button>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
