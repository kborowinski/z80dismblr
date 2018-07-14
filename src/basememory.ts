import * as assert from 'assert';



export const MAX_MEM_SIZE = 0x10000;


export class BaseMemory {
	/// The resulting memory area.
	protected memory: Uint8Array;

	/// The start address.
	protected startAddress: number;

	// The size of the area.
	protected size: number;

	/**
	 * Constructor: Initializes memory.
	 * @param startAddress The start address of the memory area.
	 * @param size The soze of the memory area.
	 */
	constructor (startAddress: number, size: number) {
		this.memory = new Uint8Array(size);
		this.startAddress = startAddress;
		this.size = size;
	}

	/**
	 * Sets a value at an index.
	 * @param index The index into the memory buffer.
	 * @param value The value for the index.
	 */
	public setValueAtIndex(index: number, value: number) {
		this.memory[index] = value;
	}


	/**
	 * Returns the memory value at address.
	 * @param address The address to retrieve.
	 * @returns It's value.
	 */
	public getValueAt(address: number) {
		address &= (MAX_MEM_SIZE-1);
		const index = address - this.startAddress;
		assert(index >= 0);
		assert(index < this.size);

		return this.memory[index];
	}


		/**
	 * Returns the word memory value at address.
	 * @param address The address to retrieve.
	 * @returns It's value.
	 */
	public getWordValueAt(address: number) {
		const word = this.getValueAt(address) + 256*this.getValueAt(address+1);
		return word;
	}


	/**
	 * Returns the word memory value at address in big endian.
	 * @param address The address to retrieve.
	 * @returns It's value.
	 */
	public getBigEndianWordValueAt(address: number) {
		const word = 256*this.getValueAt(address) + this.getValueAt(address+1);
		return word;
	}
}