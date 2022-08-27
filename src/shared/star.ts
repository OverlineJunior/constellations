import { Workspace } from "@rbxts/services";

interface StarInstance extends Part {
	Attachment: Attachment;
	Beam: Beam;
}

const stars = new Map<Part, Star>();

const container = new Instance("Folder");
container.Name = "StarContainer";
container.Parent = Workspace;

function starInstance(pos: Vector3): StarInstance {
	const star = new Instance("Part");
	star.Name = "Star";
	star.Position = pos;
	star.Parent = container;
	star.Shape = Enum.PartType.Ball;
	star.Size = new Vector3(0.25, 0.25, 0.25);
	star.Material = Enum.Material.Neon;
	star.Color = Color3.fromRGB(105, 144, 188);
	star.Anchored = true;
	star.CanTouch = false;
	star.CanCollide = false;
	star.CanQuery = false;

	const attach = new Instance("Attachment");
	attach.Parent = star;

	const beam = new Instance("Beam");
	beam.Attachment0 = attach;
	beam.Color = new ColorSequence(star.Color);
	beam.Enabled = false;
	beam.FaceCamera = true;
	beam.Brightness = 3;
	beam.LightEmission = 1;
	beam.LightInfluence = 0;
	beam.Transparency = new NumberSequence(0);
	beam.Parent = star;

	return star as StarInstance;
}

export class Star {
	readonly instance: StarInstance;
	readonly links: Array<Star>;

	constructor(pos: Vector3) {
		this.instance = starInstance(pos);
		this.links = new Array<Star>();
		stars.set(this.instance, this);
	}

	public destroy() {
		stars.delete(this.instance);
		this.instance.Destroy();
	}
}
