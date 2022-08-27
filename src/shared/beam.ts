import { RunService } from "@rbxts/services";
import { Star, stars } from "./star";

const MAX_LINK_DIST = 8;

export function startBeams() {
	function handleLink(star0: Star, star1: Star) {
		const inst0 = star0.instance;
		const inst1 = star1.instance;
		const beam = inst0.Beam;
		const dist = inst0.Position.sub(inst1.Position).Magnitude;

		if (dist > MAX_LINK_DIST) {
			beam.Enabled = false;
		} else {
			const closeMult = math.clamp((MAX_LINK_DIST - dist) / MAX_LINK_DIST, 0, 1);
			const farMult = 1 - closeMult;
			const width = closeMult * inst0.Size.X;

			beam.Enabled = true;
			beam.Attachment1 = inst1.Attachment;
			beam.Transparency = new NumberSequence(farMult);
			beam.Width0 = width;
			beam.Width1 = width;
		}
	}

	RunService.Heartbeat.Connect(() => {
		stars.forEach((star0) => {
			stars.forEach((star1) => {
				if (star0 === star1) return;

				handleLink(star0, star1);
			});
		});
	});

	/*
	container.GetChildren().forEach((inst) => {
		const otherStar = stars.get(inst as Part)!;

		if (inst === this.instance || otherStar.links.includes(this)) return;

		const dist = (inst as Part).Position.sub(this.instance.Position).Magnitude;
		const beam = this.instance.Beam;

		if (dist > MAX_LINK_DIST) {
			this.links.remove(this.links.indexOf(otherStar));
			beam.Enabled = false;
		} else {
			if (!this.links.includes(otherStar)) {
				this.links.push(otherStar);
			}

			const closeMult = math.clamp((MAX_LINK_DIST - dist) / MAX_LINK_DIST, 0, 1);
			const farMult = 1 - closeMult;
			const width = closeMult * this.instance.Size.X;

			beam.Enabled = true;
			beam.Attachment1 = otherStar.instance.Attachment;
			beam.Transparency = new NumberSequence(farMult);
			beam.Width0 = width;
			beam.Width1 = width;
		}
	});
	*/
}
