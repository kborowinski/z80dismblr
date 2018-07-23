import * as assert from 'assert';

/// A categorization (and priorization) of the numbers (labels) in the opcodes.
/// The higher the number, the higher the prio.
export const enum NumberType {
	// No label
	NONE = 0,
	// "relative-label"-type, i.e. JR
	CODE_LOCAL_LBL,
	// "loop"-type
	CODE_LOCAL_LOOP,
	// "LBL"-type
	CODE_LBL,
	// "SUB"-type
	CODE_SUB,
	// "TST"-type
	CODE_RST,
	// A relative index like (IX+5) or (IY-3)
	RELATIVE_INDEX,
	// "BYTE"-type
	NUMBER_BYTE,
	// "WORD"-type
	NUMBER_WORD,
	// "WORD"-type for ZX Next command "PUSH $nnnn"
	NUMBER_WORD_BIG_ENDIAN,
	// "Data LBL"-type
	DATA_LBL,
	// Label for "out/in" command
	PORT_LBL	// TODO: Port needs other handling. Is another space, i.e. a memory label nd a port label could have same number.
}



/**
 * returns the LabelType enum as string.
 * For debugging.
 */
export function getNumberTypeAsString(type: NumberType): string {
	switch(type) {
		case NumberType.NONE:	return "NONE";
		case NumberType.CODE_LOCAL_LBL:	return "CODE_RELATIVE_LBL";
		case NumberType.CODE_LOCAL_LOOP:	return "CODE_RELATIVE_LOOP";
		case NumberType.CODE_LBL:	return "CODE_LBL";
		case NumberType.CODE_SUB:	return "CODE_SUB";
		case NumberType.CODE_RST:	return "CODE_RST";
		case NumberType.RELATIVE_INDEX:	return "RELATIVE_INDEX";
		case NumberType.NUMBER_BYTE:	return "NUMBER_BYTE";
		case NumberType.NUMBER_WORD:	return "NUMBER_WORD";
		case NumberType.NUMBER_WORD_BIG_ENDIAN:	return "NUMBER_WORD_BIG_ENDIAN";
		case NumberType.DATA_LBL:	return "DATA_LBL";
		//case NumberType.SELF_MODIFYING_CODE:	return "SELF_MODIFYING_CODE";
		case NumberType.PORT_LBL:	return "PORT_LBL";
	}
	// Unknown
	assert(false);
	return "UNDEFINED";
}
