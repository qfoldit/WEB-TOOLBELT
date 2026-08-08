import type { ObservationFrame, ToolResult, Trajectory } from "../core/types";

export class DropleXAdapter {
  readonly id = "droplex";
  readonly capabilities = [
    "video.file.analysis",
    "video.stream.analysis",
    "tracking.trajectories",
    "tracking.motion-metrics"
  ] as const;

  constructor(private readonly gateway: {
    submitTool: (name: string, args: Record<string, unknown>) => Promise<ToolResult>
  }) {}

  analyzeFile(sourceRef: string, trackingProfile = "droplex_default", samplingFps = 30): Promise<ToolResult> {
    return this.gateway.submitTool("analyze_video_file", {
      source_ref: sourceRef, tracking_profile: trackingProfile, sampling_fps: samplingFps
    });
  }

  startStream(sourceRef: string, trackingProfile = "droplex_default", samplingFps = 15): Promise<ToolResult> {
    return this.gateway.submitTool("start_video_stream", {
      source_ref: sourceRef, tracking_profile: trackingProfile, sampling_fps: samplingFps
    });
  }

  stopStream(streamId: string): Promise<ToolResult> {
    return this.gateway.submitTool("stop_video_stream", { stream_id: streamId });
  }

  getTrackingState(streamId: string): Promise<ToolResult> {
    return this.gateway.submitTool("get_tracking_state", { stream_id: streamId });
  }

  getTrajectory(objectId: string, observationId: string): Promise<ToolResult> {
    return this.gateway.submitTool("get_trajectory", { object_id: objectId, observation_id: observationId });
  }

  normalizeObservation(data: ObservationFrame): ObservationFrame {
    return {
      ...data,
      tracks: data.tracks.map(track => ({
        ...track,
        confidence: track.confidence == null ? undefined : Math.max(0, Math.min(1, track.confidence))
      }))
    };
  }

  normalizeTrajectory(data: Trajectory): Trajectory {
    return { ...data, points: [...data.points].sort((a, b) => a.timestamp - b.timestamp) };
  }
}
