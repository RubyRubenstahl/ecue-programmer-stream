using System;
using Scripting;
using System.IO;

public static partial class sll{
	
	// Log an error message with a full stack trace
	public static void logError(Exception e){
		string message = String.Format("{0}\n{1}\n\n{2}", e.Message, e.StackTrace);
		Logger.Error(message,  true);
	}
	
	// Play a cue within a sequence by passing the sequence ID and the cue number
	public static void playCue(string sequenceId, int cueNum){
		string cueId = String.Format("{0}.Cue_{1}", sequenceId, cueNum.ToString());
		Logger.Info(String.Format("GotoCue\n  sequenceId: {0}\n  cueNum: {1}\n  cueId {2}", sequenceId, cueNum, cueId));
		Sequence sequence = getSequence(sequenceId);
		Cue cue = getCue(cueId);
		if(cue==null ) Logger.Error("Cue error");
		sequence.StartCue(cue);
	}
	
	// Set the pressed state of a toggle button
	public static void setButtonPressed(string id, bool isPressed){
		ActionPadToggleButtonControl button = getActionPadToggleButton(id);
		button.ToggleOnOff =isPressed;
	}
	
	// Returns true if a unix environment is detected, indicating we're running on a core S. 
	public static bool isCoreS(){
		return (System.Environment.OSVersion.Platform.ToString()=="Unix");
	}
	
	// Return a path that is safe to store files in. 
	// The path returned is dependant upon whether we're running on windows or a Core S
	public static string getDataFolderPath(){
	  if(isCoreS()){
	    return "/mnt/data/SYMPHOLIGHT 2/CurrentShow/";
	  }
	  else{
	    return Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "ecue/SYMPHOLIGHT 2");
	  }
	}
}

// Object getters
public static partial class sll{
	
	public static Sequence getSequence(string id){
		return (Sequence) ContentObjectAccessor.GetObject(id);
	}
	
	public static Cue getCue(string id){
		return (Cue) ContentObjectAccessor.GetObject(id);
	}
	
	public static ActionPadButtonControl getActionPadButton(string id){
		return (ActionPadButtonControl) ContentObjectAccessor.GetObject(id);
	}
	
	public static ActionPadToggleButtonControl getActionPadToggleButton(string id){
		return (ActionPadToggleButtonControl) ContentObjectAccessor.GetObject(id);
	}
	
	public static ActionPadImageControl getActionPadImageControl(string id){
		return (ActionPadImageControl) ContentObjectAccessor.GetObject(id);
	}
	
	public static ActionPadLabelControl getActionPadLabel(string id){
		return (ActionPadLabelControl) ContentObjectAccessor.GetObject(id);
	}
	
	public static ActionPadFaderControl getActionPadFader(string id){
		return (ActionPadFaderControl) ContentObjectAccessor.GetObject(id);
	}
	
	public static ActionPadIFrameControl getActionPadIFrame(string id){
		return (ActionPadIFrameControl) ContentObjectAccessor.GetObject(id);
	}
	
	public static ActionPadColorPickerControl getActionPadColorPicker(string id){
		return (ActionPadColorPickerControl) ContentObjectAccessor.GetObject(id);
	}
	
	public static ActionPadColorPickerWheelControl getActionPadColorPickerWheel(string id){
		return (ActionPadColorPickerWheelControl) ContentObjectAccessor.GetObject(id);
	}
}
