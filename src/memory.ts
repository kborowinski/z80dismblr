//import * as util from 'util';
//import * as assert from 'assert';


const MAX_MEM_SIZE = 0x10000;

enum MemAttribute {
	/// Unassigned memory
	UNUSED = 0,
	// Assigned memory
	ASSIGNED,
}

/**
 * Class to hold the memory (segments).
 */
export class Memory {

	/// The resulting memory area.
	protected memory = new Uint8Array(MAX_MEM_SIZE);

	/// An attribute field for the memory.
	protected memoryAttr = new Array<MemAttribute>(MAX_MEM_SIZE);


	/**
	 * Constructor: Initializes memory.
	 */
 	constructor () {
		// Init memory
		for(let i=0; i<MAX_MEM_SIZE; i++) {
			this.memory[i] = 0;
			this.memoryAttr[i] = MemAttribute.UNUSED;
		}
	}


	/**
	 * Define the memory area to disassemble.
	 * @param origin The start address of the memory area.
	 * @param memory The memory area.
	 */
	public setMemory(origin:number, memory: Uint8Array) {
		const size = memory.length;
		for(let i=0; i<size; i++) {
			const addr = (origin+i) & (MAX_MEM_SIZE-1);
			this.memory[addr] = memory[i];
			this.memoryAttr[addr] = MemAttribute.ASSIGNED;
		}
	}


	/**
	 * Reads a memory area as binary from a file.
	 * @param origin The start address of the memory area.
	 * @param path The file path to a binary file.
	 */
	public readMemory(origin:number, path: string) {
		// TODO: implement
	}


	/**
	 * Returns the memory value at address.
	 * @param address The address to retrieve.
	 * @returns It's value.
	 */
	public getValueAt(address: number) {
		return this.memory[address&(MAX_MEM_SIZE-1)];
	}

	/**
	 * Returns the word memory value at address.
	 * @param address The address to retrieve.
	 * @returns It's value.
	 */
	public getWordValueAt(address: number) {
		const word = this.memory[address&(MAX_MEM_SIZE-1)] * 256*this.memory[address&(MAX_MEM_SIZE-1)];
		return word;
	}


}

